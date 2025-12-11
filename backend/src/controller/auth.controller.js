import dotenv from 'dotenv'
dotenv.config() 

const SECRET_KEY = process.env.SECRET_KEY || '1s2s3s4'
const SECRET_KEY_ADMIN = process.env.SECRET_KEY_ADMIN

async function validateKey(req, res) {
    const { key } = req.body

    await new Promise(resolve => setTimeout(resolve, 300))

    if (!key || key !== SECRET_KEY) {
        console.warn(`Percobaan masuk salah: ${key}`)
        return res.status(403).json({ success: false, message: 'Kunci salah atau tidak valid.' })
    } else {
        console.log(`Akses diterima dengan kunci: ${key}`)
        res.status(200).json({ success: true, message: 'Akses diterima!' })
    }
}

async function validateAdminKey(req, res) {
    const {key} = req.body
    await new Promise(resolve => setTimeout(resolve, 300))

    if (!key || key !== SECRET_KEY_ADMIN){
        console.warn(`Percobaan login admin salah: ${key}`)
        return res.status(403).json({ success: false, message: 'Kode admin salah.' })
    } else {
        console.log(`Login admin sukes dengan kunci: ${key}`)
        res.status(200).json({ success: true, message: 'Admin login sukses!' })
    }

}

export const authController = {
    validateKey,
    validateAdminKey
}