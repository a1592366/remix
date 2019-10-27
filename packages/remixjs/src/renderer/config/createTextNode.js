export default function createTextNode (text, rootContainerElement) {
  const document = rootContainerElement.ownerDocument;
  const textNode = document.createTextNode(text);

  return textNode;
} 