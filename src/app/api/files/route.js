import { NextResponse } from "next/server";
const { Readable } = require("stream");
const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });

const saveFile = async (file, name) => {
  try {
    const options = {
      pinataMetadata: {
        name,
      },
    };

    return await pinata.pinFileToIPFS(file, options);
  } catch (error) {
    throw error;
  }
};

// export async function GET(req, res) {
//   try {
//     const response = await pinata.pinList(
//       { pinataJWTKey: process.env.PINATA_JWT },
//       {
//         pageLimit: 1,
//       }
//     );
//     res.json(response.rows[0]);
//   } catch (e) {
//     console.log(e);
//     res.status(500).send("Server Error");
//   }
// }

export async function POST(request, res) {
  try {
    const data = await request.formData();
    const file = data.get("file");

    if (!file) return NextResponse.json({ success: false });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // TODO: check if this is necessary
    const readableStream = new Readable({
      read() {
        // Push the buffer data to the stream
        this.push(buffer);
        // Signal the end of the stream
        this.push(null);
      },
    });

    const response = await saveFile(readableStream, file.name);
    const { IpfsHash } = response;

    return NextResponse.json({ success: true, ipfsHash: IpfsHash });
  } catch (e) {
    console.log(e);
    // TODO: handle this error
    return NextResponse.json({ success: false });
  }
}
