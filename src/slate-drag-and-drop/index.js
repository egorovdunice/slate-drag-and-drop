import { useCallback, useEffect } from 'react';
import Sortable from 'sortablejs';

export default function DragAndDrop({ref, setReadOnly}) {
  let timer = null;

  const handleButtonPress = () => {
    timer = setTimeout(() => {
      if (timer) {
        timer = null;
      }else{
        setReadOnly(!ref.current.editor.readOnly);
      }
    }, 200)
  };

  const onUpdate = useCallback(() => {
    if (ref.current) {
      const nodes = document.getElementById(ref.current.props.id).childNodes;
      nodes.forEach((node, index) => { ref.current.editor.moveNodeByKey(node.dataset.key,0,index) });
    }
  }, [ref]);

  useEffect(() => {
    if (ref.current) Sortable.create(
      document.getElementById(ref.current.props.id),
      { onUpdate }
    )
  }, [ref,onUpdate]);

  return {
    onMouseDown: handleButtonPress,
  }
}