import {
    FC,
    PropsWithChildren,
    RefObject,
    createContext,
    memo,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { createPortal } from "react-dom";
import { ZoomContext, ZoomElement } from "../ZoomProvider";
import { useRelease } from "../useZoom";

const NodeViewContext = createContext({} as NodeViewInstance);

const NodeView: FC<PropsWithChildren<NodeViewProps>> = ({ children, portal }) => {
    const [target, { close: closeRaw }] = useContext(ZoomContext);
    const { reback } = useRelease();

    const [view, setView] = useState(false);

    const viewRef = useRef<ViewElement>(null);
    const listRef = useRef<ZoomElement[]>([]);

    const close = useCallback(() => closeRaw(target), [target, closeRaw]);
    const createElement = useCallback(() => {
        const target = portal ? portal.current : undefined;
        if (!target) return document.body;

        const node = document.importNode(target.cloneNode());
        node.classList.add("zoom-portal");

        node.originTarget = target;
        target.replaceWith(node);

        return node;
    }, [portal]);

    const revert = useCallback(() => {
        listRef.current.forEach(item => reback(item));
        listRef.current = [];
    }, [listRef, reback]);

    useEffect(() => {
        revert();
        if (target !== undefined) {
            if (viewRef.current === null) viewRef.current = createElement();
            setView(true);

            target.dataset.mode = "ignore";
            listRef.current.push(target);
        } else {
            const origin = viewRef.current?.originTarget;
            if (origin) viewRef.current.replaceWith(origin);

            viewRef.current = null;
            setView(false);
        }
    }, [listRef, target, viewRef, createElement, revert, setView]);

    // 对于内部的plugin，如果通过context调用close，则会捆包额外副作用
    // 为了解耦，所以内部通过event进行close
    useEffect(() => {
        const handle = (event: ViewEvent) => {
            if (event.revert) close();
        };
        viewRef.current?.addEventListener("click", handle);
        viewRef.current?.addEventListener("touchend", handle);
        return () => {
            viewRef.current?.removeEventListener("click", handle);
            viewRef.current?.removeEventListener("touchend", handle);
        };
    }, [viewRef, close]);

    return view === false
        ? null
        : createPortal(
              <NodeViewContext.Provider value={{ close }}>
                  {viewRef.current.originTarget ? (
                      children
                  ) : (
                      <div className="zoom-portal zoom-potal-full">{children}</div>
                  )}
              </NodeViewContext.Provider>,
              viewRef.current,
          );
};

type ViewEvent = Event & {
    revert?: boolean;
};

type ViewElement = HTMLElement & {
    originTarget?: HTMLElement;
};

export interface NodeViewInstance {
    close: () => void;
}

export interface NodeViewProps {
    portal?: RefObject<HTMLElement>;
}

export { NodeViewContext };

export default memo(NodeView);
