import Document, {DocumentContext, Head, Html, Main, NextScript,} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    // @ts-ignore
    return <Html><Head><meta charSet="UTF-8"/><meta name="viewport" content="width=1920, initial-scale=1"/></Head><body><Main/><NextScript/></body></Html>
  }
}

export default MyDocument;
