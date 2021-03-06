
const iAmNotInBigStack = stackKey => stackKey.slice(2) !== 'BigStack';

const iAmTopCard = (ownStack, stackPosition) => stackPosition === ownStack.length - 1;

const iAmADraggableStack = (stackKey) => {
  return stackKey === 'DragHandleStack'
}

export const canIDragGivenStackKeyOwnStackAndPosition = (
  stackKey,
  ownStack,
  stackPosition
) => {
  return iAmNotInBigStack(stackKey) &&
    ( iAmTopCard(ownStack, stackPosition) || iAmADraggableStack(stackKey) )
}
