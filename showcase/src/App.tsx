import React, { useState } from "react";
import { DraggableSemanticList } from "./DraggableSemanticList";
import { DraggableSemanticTable } from "./DraggableSemanticTable";

const initialItems: {
  id: number;
  name: string;
}[] = [
  { id: 1, name: "Item A" },
  { id: 2, name: "Item B" },
  { id: 3, name: "Item C" },
  { id: 4, name: "Item D" },
];

function App() {
  const [items, setItems] = useState<{ id: number; name: string }[]>(
    initialItems
  );
  const onSubmit = (
    values: {
      id: number;
      name: string;
    }[]
  ) => {
    console.log("values");
  };
  return (
    <div className="App">
      <DraggableSemanticList
        displayKey="name"
        items={items}
        onUpdate={setItems}
      />
      <DraggableSemanticTable
        displayKey="name"
        items={items}
        onUpdate={setItems}
      />
    </div>
  );
}

export default App;
