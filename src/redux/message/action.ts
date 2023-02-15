export const MESSAGE_OPEN = 'MESSAGE_OPEN'
export const messageAction = (messageState: any) => {
  return {
    type: 'MESSAGE_OPEN',
    payload: {
      open: true,
      message: messageState.message,
      type: messageState.type,
    },
  }
}
