import { useState, useEffect } from "react";

const useGoToBottom = (ref, triggerGoToBottom) => {
  const [isScrolledToBottom, SetIsScrolledToBottom] = useState(null);
  const [isFabOnScreen, setIsFabOnScreen] = useState(null);

  const checkHeight = () => {
    const { current } = ref;
    const { scrollHeight, clientHeight, scrollTop } = current;

    const isBottom = (scrollHeight - clientHeight) * 0.95 < scrollTop;
    const renderFabOnScreen = scrollHeight !== clientHeight;

    setIsFabOnScreen(renderFabOnScreen);

    if (isBottom) SetIsScrolledToBottom(true);
    if (!isBottom && isScrolledToBottom) SetIsScrolledToBottom(false);
  };

  const goToBottom = () => {
    ref.current.scrollTop = ref.current.scrollHeight;
  };

  useEffect(() => {
    // Scroll to the bottom of the specific div
    if (ref.current) {
      goToBottom();
    }
  }, [triggerGoToBottom]);

  return { isFabOnScreen, checkHeight, goToBottom, isScrolledToBottom };
};

export default useGoToBottom;
