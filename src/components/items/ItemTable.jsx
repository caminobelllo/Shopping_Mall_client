import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const ItemTable = ({ items }) => {
  return (
    <div>
      <DataTable
        value={items}
        responsibleLayout="scroll"
        dataKey="id"
        paginator
        rows={5}
        showGridlines
        stripedRows
        emptyMessage="-"
        tableStyle={{
          width: "65rem",
          height: "20rem",
          textAlign: "center",
        }}
      >
        <Column
          field="id"
          header="ID"
          style={{ width: "25%" }}
          headerStyle={{
            fontSize: "20px",
            fontWeight: "800",
            padding: "1rem 0 1rem 6.5rem",
            backgroundColor: "#f3f3f3",
          }}
        ></Column>
        <Column
          field="itemName"
          header="상품명"
          style={{ width: "25%" }}
          headerStyle={{
            fontSize: "20px",
            fontWeight: "800",
            padding: "1rem 0 1rem 6.5rem",
            backgroundColor: "#f3f3f3",
          }}
        ></Column>
        <Column
          field="itemPrice"
          header="가격"
          style={{ width: "25%" }}
          headerStyle={{
            fontSize: "20px",
            fontWeight: "800",
            padding: "1rem 0 1rem 6.5rem",
            backgroundColor: "#f3f3f3",
          }}
        ></Column>
        <Column
          field="stockQuantity"
          header="수량"
          style={{ width: "25%" }}
          headerStyle={{
            fontSize: "20px",
            fontWeight: "800",
            padding: "1rem 0 1rem 6.5rem",
            backgroundColor: "#f3f3f3",
          }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default ItemTable;
