// public/details.js
document.addEventListener("DOMContentLoaded", () => {
    const minus = document.getElementById("btn-minus");
    const plus = document.getElementById("btn-plus");
    const qty = document.getElementById("buy-quantity");
    const addBtn = document.getElementById("add-to-cart-main");

    if(minus) minus.onclick = () => { if(qty.value > 1) qty.value--; };
    if(plus) plus.onclick = () => { qty.value++; };

    if(addBtn) addBtn.onclick = async () => {
        const productId = addBtn.getAttribute("data-id");
        try {
            const res = await fetch("/cart/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId, quantity: qty.value })
            });
            if(res.ok) alert("Đã thêm thành công!");
        } catch (e) { alert("Lỗi kết nối"); }
    };
});