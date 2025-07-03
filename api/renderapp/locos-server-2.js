function waitRenderAppInit(status_url) {
  return new Promise(resolve => {
    const interval = setInterval(async () => {
      const res = await fetch(status_url).then(res => res.text())
      if (res == "True" || res == "False") {
        resolve(res)
        clearInterval(interval)
      }
      console.log("Waiting render app");
    }, 5000)
  })
}

export default async function handler(req, res) {
  const status_url = "https://minecraft-skin-changer.onrender.com/server/administration/schedule/check/status/"
  let status = await fetch(status_url).then(res => res.text())

  if (status != "True" && status != "False") {
    status = await waitRenderAppInit(status_url)
  }

  return res.status(200).send(status)
}