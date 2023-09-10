import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import User from "@/models/User";
import CryptoJS from "crypto-js";

export async function POST(Request) {
    try {

        const { newPassword, currentPassword } = await Request.json();
        // get token from cookies
        const token = cookies().get('codesWearJwt');
        if (!token) {
            return NextResponse.json({ success: false });
        }
        const { email } = await verify(token.value, process.env.JWT_SECRET);
        const user = await User.findOne({ email });
        // decrypting password
        const originalPassword = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET).toString(CryptoJS.enc.Utf8)
        if (originalPassword !== currentPassword) {
            return NextResponse.json({ success: false, message: 'Entered password is wrong. Please enter right password' });
        }
        // update user password
        await User.findOneAndUpdate({ email }, { password: CryptoJS.AES.encrypt(newPassword, process.env.AES_SECRET).toString() });
        return NextResponse.json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        console.log(error.message);
    }
}