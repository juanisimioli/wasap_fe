export const uploadFileToIpfs = async (file) => {
  if (!file) return;

  const data = new FormData();
  data.set("file", file), { filename: file.name };

  const res = await fetch("/api/files", {
    method: "POST",
    body: data,
  });

  const responseData = await res.json();

  setCid(responseData.ipfsHash);

  if (!res.ok) throw new Error(await res.text());

  return responseData.ipfsHash;
};
