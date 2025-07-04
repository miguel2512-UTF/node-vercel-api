async function get_render_app_status(status_url, timeout = 1000) {
    const controller = new AbortController()
    const idTimeout = setTimeout(() => controller.abort(), timeout)

    try {
        await fetch(status_url, { signal: controller.signal })
        clearTimeout(idTimeout)
        return true
    } catch (error) {
        return false
    }
}

export default async function handler(req, res) {
  const status_url = "https://minecraft-skin-changer.onrender.com/status/"
  const status = await get_render_app_status(status_url, 2000)

  return res.status(200).send(status)
}