export function generateOTP(expireTime = 15 * 60 * 1000 ){
    const otp = Math.floor(Math.random() * 90000 + 10000);
    const otpExpire = Date.now() + expireTime * 60 * 1000; // 15 minutes
    return {otp};
}