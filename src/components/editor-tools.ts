import Header from '@editorjs/header'
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import InlineCode from '@editorjs/inline-code'
import ImageTool from '@editorjs/image'

import { uploadFiles } from '@/lib/uploadthing'

export const editorTools = {
  header: Header,
  linkTool: {
    class: LinkTool,
    config: {
      endpoint: '/api/link',
    },
  },
  image: {
    class: ImageTool,
    config: {
      uploader: {
        async uploadByFile(file: File) {
          // upload to uploadthing
          const [res] = await uploadFiles({ files: [file], endpoint: 'imageUploader' })

          return {
            success: 1,
            file: {
              url: res.fileUrl,
            },
          }
        },
      },
    },
  },
  list: List,
  code: Code,
  inlineCode: InlineCode,
  table: Table,
  embed: Embed,
}
