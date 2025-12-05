import dotenv from 'dotenv';
dotenv.config(); 

const SECRET_KEY = process.env.SECRET_KEY || '1s2s3s4';

async function validateKey(req, res) {
    const { key } = req.body;

    await new Promise(resolve => setTimeout(resolve, 300)); 

    if (!key || key !== SECRET_KEY) {
        console.warn(`Percobaan akses dengan kunci salah: ${key}`);
        return res.status(403).json({ success: false, message: 'Kunci salah atau tidak valid.' });
    }

    res.status(200).json({ success: true, message: 'Akses diterima!' });
}

export const authController = {
    validateKey
};