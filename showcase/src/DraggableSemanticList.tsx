import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { List, Message, Ref } from "semantic-ui-react";

export const DraggableSemanticList = <
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
      <Droppable droppableId="list">
        {(provided) => (
          <Ref innerRef={provided.innerRef}>
            <List {...provided.droppableProps}>
              {items.length ? (
                items.map((item, index) => (
                  <Draggable
                    draggableId={indexKey ?? `item-${index}`}
                    key={indexKey ?? `item-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <Ref innerRef={provided.innerRef}>
                        <List.Item
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          content={
                            render ?? displayKey ? item[displayKey] : item
                          }
                        />
                      </Ref>
                    )}
                  </Draggable>
                ))
              ) : (
                <List.Item content={<Message content={emptyMessage} />} />
              )}
              {provided.placeholder}
            </List>
          </Ref>
        )}
      </Droppable>
    </DragDropContext>
  );
};
