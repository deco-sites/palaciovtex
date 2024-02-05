export default function VerifyMobile() {
    const mobile = globalThis.innerWidth;
    if(mobile <= 768) {
        console.log(true)
    }
}
globalThis.addEventListener('resize', VerifyMobile);