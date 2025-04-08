// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recyclingForm');
    const totalDisplay = document.getElementById('totalDisplay');
  
    // Fetch total recycled on load
    loadTotal();
  
    // Submit recycling data
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const username = document.getElementById('username').value.trim();
      const amount = parseFloat(document.getElementById('amount').value.trim());
  
      if (!username || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid name and positive amount.");
        return;
      }
  
      try {
        const res = await fetch('http://localhost:5000/api/stats/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            materialType: "plastic",
            quantityKg: amount,
            updatedBy: username
          })
        });
  
        if (res.ok) {
          alert('✅ Recycling data submitted successfully!');
          form.reset();
          loadTotal();
        } else {
          alert('❌ Failed to submit data. Please try again.');
        }
      } catch (err) {
        console.error(err);
        alert('⚠️ Server error. Make sure backend is running.');
      }
    });
  
    // Load total recycled data
    async function loadTotal() {
      try {
        const res = await fetch('http://localhost:5000/api/stats/totals');
        const data = await res.json();
        const plastic = data.find(item => item._id === "plastic");
  
        totalDisplay.textContent = plastic ? `${plastic.totalKg} kg` : 'No data yet';
        totalDisplay.classList.add('highlight');
        setTimeout(() => totalDisplay.classList.remove('highlight'), 1000);
      } catch (err) {
        totalDisplay.textContent = 'Loading Data...';
        console.error('Fetch error:', err);
      }
    }
  });
  