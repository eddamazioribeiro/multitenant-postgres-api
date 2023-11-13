exports.healthPing = (req, res) => {
  let uptime = process.uptime();
  let today = Date().toLocaleString();
  let message = `API running in port: ${ req.config.PORT }, Uptime: ${ uptime }, ${ today }`;

  return res.status(200).json({ message });
};