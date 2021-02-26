import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Table, Message, Ref } from "semantic-ui-react";

export const DraggableSemanticTable = <
  T extends { [displayKey: string]: undefined | string | number }
>({
  items,
  displayKey,
  indexKey,
  render,
  emptyMessage = "No items found",
  onUpdate,
}: {
  items: T[];
  displayKey: keyof T;
  indexKey?: string;
  emptyMessage?: string;
  render?: (item: T) => void;
  onUpdate: (updatedItems: T[]) => void;
}) => {
  const onDragEnd = (result: any) => {
    if (!result.destination || !items.length) {
      return;
    }

    let updatedItems = [...items];
    let movedItem = updatedItems.splice(result.source.index, 1)[0];
    updatedItems.splice(result.destination.index, 0, movedItem);

    onUpdate(updatedItems);

    return result;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Testing</Table.HeaderCell>
            <Table.HeaderCell>Testing</Table.HeaderCell>
            <Table.HeaderCell>Testing</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Droppable droppableId="list">
          {(provided) => (
            <Ref innerRef={provided.innerRef}>
              <Table.Body {...provided.droppableProps}>
                {items.length ? (
                  items.map((item, index) => (
                    <Draggable
                      draggableId={indexKey ?? `item-${index}`}
                      key={indexKey ?? `item-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <Ref innerRef={provided.innerRef}>
                          <Table.Row
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Table.Cell>
                              {render ?? displayKey ? item[displayKey] : item}
                            </Table.Cell>
                            <Table.Cell>
                              {render ?? displayKey ? item[displayKey] : item}
                            </Table.Cell>
                            <Table.Cell>
                              {render ?? displayKey ? item[displayKey] : item}
                            </Table.Cell>
                          </Table.Row>
                        </Ref>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <Table.Row content={<Message content={emptyMessage} />} />
                )}
                {provided.placeholder}
              </Table.Body>
            </Ref>
          )}
        </Droppable>
      </Table>
    </DragDropContext>
  );
};
