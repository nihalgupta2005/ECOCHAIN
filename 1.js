<script>
// Simulated values; replace with actual values passed via URL or backend in real setup
const amount = localStorage.getItem("recycledKg") || 2.5;
document.getElementById("amountDisplay").textContent = amount;
document.getElementById("earnings").textContent = (amount * 5).toFixed(2); // ₹5/kg
document.getElementById("ecoPoints").textContent = Math.floor(amount * 10);
document.getElementById("carbon").textContent = (amount * 1.5).toFixed(2); // approx CO₂ kg saved
</script>