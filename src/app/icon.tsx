import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const size = { width: 256, height: 256 }
export const contentType = 'image/png'

export default function Icon() {
  const iconData = readFileSync(join(process.cwd(), 'src/app/original-icon.png'))
  const base64 = `data:image/png;base64,${iconData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        <img src={base64} style={{ width: '90%', height: '90%', objectFit: 'contain' }} alt="icon" />
      </div>
    ),
    { ...size }
  )
}
