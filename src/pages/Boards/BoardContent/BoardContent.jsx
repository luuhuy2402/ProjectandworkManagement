import { Box } from "@mui/material";
import PropTypes from "prop-types";
import ListCoulumns from "~/pages/Boards/BoardContent/ListColumns/ListCoulumns";
import { mapOrder } from "~/utils/sorts";
import {
    DndContext,
    // PointerSensor,
    useSensor,
    useSensors,
    MouseSensor,
    TouchSensor,
    DragOverlay,
    defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import Column from "~/pages/Boards/BoardContent/ListColumns/Column/Column";
import CardItem from "~/pages/Boards/BoardContent/ListColumns/Column/ListCards/CardItem/CardItem";

const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: "ACTIVE_DRAG-ITEM_TYPE_COLUMN",
    CARD: "ACTIVE_DRAG-ITEM_TYPE_CARD",
};
function BoardContent({ board }) {
    // Nếu sử dụng PointerSensor thì kết hợp thêm thuộc tính CSS touch-action: none ở những phần tử kéo thả - nhưng trên moblie sẽ hoạt động ko tốt
    // const pointerSensor = useSensor(PointerSensor, {
    //     // Require the mouse to move by 10 pixels before activating
    //     activationConstraint: {
    //         distance: 10,
    //     },
    // });
    // const sensors = useSensors(pointerSensor);

    // Yêu cầu chuột phải di chuyển 10px thì mới kích hoạt event
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        },
    });
    //Nhấn giữ 250ms mới kích hoạt event, di chuyển 5px mới kích hoạt event
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 250,
            tolerance: 500,
        },
    });
    // Ưu tiên sử dụng kết hợp 2 loại sensor là mouseSensor và touchSensor để có trải nghiệm trên mobile tốt
    const sensors = useSensors(mouseSensor, touchSensor);

    const [orderedColumns, setOrderedColumns] = useState([]);

    // Cùng một thời điểm chỉ có 1 phần tử đang được kéo(column hoặc card)
    const [activeDragItemId, setActiveDragItemId] = useState(null);
    const [activeDragItemType, setActiveDragItemType] = useState(null);
    const [activeDragItemData, setActiveDragItemData] = useState(null);

    useEffect(() => {
        setOrderedColumns(
            mapOrder(board?.columns, board?.columnOrderIds, "_id")
        );
    }, [board]);

    // Khi bắt đầu kéo thả
    const handleDragStart = (event) => {
        console.log("Handle Drag Start", event);
        setActiveDragItemId(event?.active?.id);
        setActiveDragItemType(
            event?.active?.data?.current?.columnId
                ? ACTIVE_DRAG_ITEM_TYPE.CARD
                : ACTIVE_DRAG_ITEM_TYPE.COLUMN
        );
        setActiveDragItemData(event?.active?.data?.current);
    };
    // Khi kết thúc kéo thả
    const handleDragEnd = (event) => {
        console.log(event);
        const { active, over } = event;

        //Kiểm tra nếu không tồn tại over (kéo ra ngoài board) thì return để tránh lỗi
        if (!over) {
            return;
        }

        // Nếu vị trí sau khi kéo thả khác vị trí ban đầu
        if (active.id !== over.id) {
            // Lấy vị trí cũ (từ thằng active)
            const oldIndex = orderedColumns.findIndex(
                (c) => c._id === active.id
            );
            // Lấy vị trí mới (từ thằng over)
            const newIndex = orderedColumns.findIndex((c) => c._id === over.id);

            //Dùng arrayMove để sắp xếp lại mảng bản đầu
            const dndOrderedColumns = arrayMove(
                orderedColumns,
                oldIndex,
                newIndex
            );
            // Thứ tự id mới sau khi di chuyển
            // const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);

            // Cập nhật lại state sau khi kéo thả
            setOrderedColumns(dndOrderedColumns);
        }
        setActiveDragItemId(null);
        setActiveDragItemType(null);
        setActiveDragItemData(null);
    };

    const customDropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: "0.5",
                },
            },
        }),
    };
    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            sensors={sensors}
        >
            <Box
                sx={{
                    bgcolor: (theme) =>
                        theme.palette.mode === "dark" ? "#394f6b" : "#1FA2A5",
                    width: "100%",
                    height: (theme) => theme.custom.boardContentHeight,
                    p: "10px 0",
                }}
            >
                <ListCoulumns columns={orderedColumns} />
                <DragOverlay dropAnimation={customDropAnimation}>
                    {!activeDragItemType && null}
                    {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
                        <Column column={activeDragItemData} />
                    )}
                    {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
                        <CardItem card={activeDragItemData} />
                    )}
                </DragOverlay>
            </Box>
        </DndContext>
    );
}
BoardContent.propTypes = {
    board: PropTypes.shape({
        columns: PropTypes.array,
        columnOrderIds: PropTypes.array,
    }),
};

export default BoardContent;
