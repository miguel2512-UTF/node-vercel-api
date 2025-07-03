async function get_renderapp_status(status_url) {
  try {
    await fetch(status_url).then(res => res.json())
    return true
  } catch (error) {
    return false 
  }
}

export default async function handler(req, res) {
  const status_url = "https://minecraft-skin-changer.onrender.com/status/"
  const status = await get_renderapp_status(status_url)

  return res.status(200).send(status)
}