import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'

export const modules = {
  embed: Embed,
  header: Header,
  table: Table,
  list: List,
  checklist: CheckList,
  marker: Marker,
  linkTool: LinkTool,
  image: SimpleImage,
  raw: Raw,
  warning: Warning,
  quote: Quote,
  code: Code,
  inlineCode: InlineCode,
  delimiter: Delimiter,
}
