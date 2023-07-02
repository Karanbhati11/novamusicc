export async function FetchingData(playlist) {
  const mainURL = "/player?url=";
  const Idarray = [];
  if (playlist === undefined) {
    console.log("error");
  } else {
    const a = JSON.parse(localStorage.getItem("Playlists"));
    const hey = await a[playlist.split("%20").join(" ")]?.map(async (items) => {
      if (!Idarray.includes(items.id)) {
        Idarray.push(items.id);
      }
      const fetccherr = Promise.resolve(Api.get(`${mainURL}${items.VideoID}`));
      return fetccherr;
    });
    const results = await Promise.all(hey?.map((p) => p.catch((e) => e)));
    const validResults = results.filter((result) => !(result instanceof Error));

    var newarray = Idarray;
    var merged = validResults.map(function (value, index) {
      var newValue = value;
      newValue.data.storageID = newarray[index];
      return newValue;
    });
  }
  return merged;
}
