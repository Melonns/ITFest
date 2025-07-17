let expenses = [];

export async function GET() {
  return Response.json(expenses);
}

export async function POST(req) {
  const { amount, description, category } = await req.json(); // tambahkan category
  const newExpense = {
    id: Date.now(), // ID unik
    amount: Number(amount),
    description,
    category, // simpan category
  };
  expenses.push(newExpense);
  return Response.json({ success: true });
}

export async function DELETE(req) {
  const { id } = await req.json();
  expenses = expenses.filter(e => e.id !== id);
  return Response.json({ success: true });
}

export async function PATCH(req) {
  const { id, amount, description, category } = await req.json(); // tambahkan category
  expenses = expenses.map(e => {
    if (e.id === id) {
      return { ...e, amount: Number(amount), description, category }; // update juga
    }
    return e;
  });
  return Response.json({ success: true });
}
