export const uploadFileToIpfs = async (file, setError) => {
  if (!file) return;

  if (file?.size > 205000) {
    setError("Image must be lower than 200kb");
    return;
  }

  const data = new FormData();
  data.set("file", file), { filename: file.name };

  const res = await fetch("/api/files", {
    method: "POST",
    body: data,
  });

  const responseData = await res.json();

  if (!res.ok) throw new Error(await res.text());

  return responseData.ipfsHash;
};
