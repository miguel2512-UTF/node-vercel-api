function waitRenderAppInit(status_url) {
  return new Promise(resolve => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(status_url).then(res => res.json())
        if (res.status) {
          resolve()
          clearInterval(interval)
        }
      } catch (error) {
        console.log("Waiting render app");
      }
    }, 5000)
  })
}

export default async function handler(req, res) {
    await waitRenderAppInit("https://minecraft-skin-changer.onrender.com/status")

    res.status(200).send("True")
}