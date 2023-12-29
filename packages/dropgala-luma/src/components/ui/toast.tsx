import toast from 'react-hot-toast'

const errorColor = '#d20b0b'
const successColor = '#2fbf71'

export const notify = {
  success: (message: string) =>
    toast.custom(
      () => {
        return (
          <div
            style={{ background: successColor }}
            className="px-4 py-2 rounded-sm"
          >
            <p className="text-white font-medium">{message}</p>
          </div>
        )
      },
      {
        duration: 4000,
        position: 'top-right'
      }
    ),
  error: (message: string) =>
    toast.custom(
      () => {
        return (
          <div
            style={{ background: errorColor }}
            className="px-4 py-2 rounded-sm"
          >
            <p className="text-white font-medium">{message}</p>
          </div>
        )
      },
      {
        duration: 4000,
        position: 'top-right'
      }
    )
}
