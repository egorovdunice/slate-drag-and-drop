import { useCallback, useEffect } from 'react';
import Sortable from 'sortablejs';
import './style.css';

export default function DragAndDrop({ref, setReadOnly}) {
  const onUpdate = useCallback(() => {
    if (ref.current) {
      const nodes = document.getElementById(ref.current.props.id).childNodes;
      nodes.forEach((node, index) => { ref.current.editor.moveNodeByKey(node.dataset.key,0,index) });
    }
  }, [ref]);

  const onStart = () => {
    document.querySelectorAll('.slate-sortable-handle').forEach((e) => e.classList.remove('slate-sortable-handle-hover'));
  };

  const onEnd = () => {
    document.querySelectorAll('.slate-sortable-handle').forEach((e) => e.classList.add('slate-sortable-handle-hover'));
  };

  const createHandler = () => {
    let handler = document.createElement('div');
    handler.className = "slate-sortable-handle slate-sortable-handle-hover";
    handler.onmouseenter = () => setReadOnly(true);
    handler.onmouseleave = () => setReadOnly(false);
    return handler
  };

  useEffect(() => {
    if (ref.current) Sortable.create(
      document.getElementById(ref.current.props.id),
      {
        onEnd,
        onStart,
        onUpdate,
        ghostClass: 'slate-sortable-ghost',
        dragClass: 'slate-sortable-drag',
        handle: '.slate-sortable-handle',
      }
    );
  }, [ref,onUpdate]);

  return {
    onCommand: (command, editor, next) => {
      if(ref.current && command.type === 'save') {
        const nodes = document.getElementById(ref.current.props.id).childNodes;
        nodes.forEach((node) => {
          if(!node.getElementsByClassName("slate-sortable-handle").length) node.append(createHandler());
        })
      }
      next()
    }
  }
}