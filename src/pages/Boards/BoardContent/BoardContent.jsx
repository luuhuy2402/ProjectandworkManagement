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
    closestCorners,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import Column from "~/pages/Boards/BoardContent/ListColumns/Column/Column";
import CardItem from "~/pages/Boards/BoardContent/ListColumns/Column/ListCards/CardItem/CardItem";
import { cloneDeep } from "lodash";

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
    const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
        useState(null);

    useEffect(() => {
        setOrderedColumns(
            mapOrder(board?.columns, board?.columnOrderIds, "_id")
        );
    }, [board]);

    const findColumnByCardId = (cardId) => {
        return orderedColumns.find((column) =>
            column.cards.map((card) => card._id).includes(cardId)
        );
    };

    // Cập nhật lại state trong trường hợp di chuyển giữa các column khác nhau
    const moveCardBetweenDifferentColumn = (
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
    ) => {
        setOrderedColumns((prevColumns) => {
            //tìm vị trí của overCard trong column đích ( nơi activeCard sắp được thả)
            const overCardIndex = overColumn?.cards?.findIndex(
                (card) => card._id === overCardId
            );
            // logic tính toán "cardIndex mơi" (trên hoặc dưới overCard) lấy chuẩn ra từ code của thư viện
            let newCardIndex;
            const isBelowOverItem =
                active.rect.current.translated &&
                active.rect.current.translated.top >
                    over.rect.top + over.rect.height;
            const modifier = isBelowOverItem ? 1 : 0;
            newCardIndex =
                overCardIndex >= 0
                    ? overCardIndex + modifier
                    : overColumn?.cards?.length + 1;

            //Clone marng OrderedColumnsState cũ ra một cái mới để xử lý data rồi return - cập nhật lại OrderedColumnState mới
            const nextColumns = cloneDeep(prevColumns);
            const nextActiveColumn = nextColumns.find(
                (column) => column._id === activeColumn._id
            );
            const nextOverColumn = nextColumns.find(
                (column) => column._id === overColumn._id
            );

            // Column cũ
            if (nextActiveColumn) {
                // Xóa card ở cái column active(column cũ, cái lúc mà kéo card ra khỏi nó để sang column khác)
                nextActiveColumn.cards = nextActiveColumn.cards.filter(
                    (card) => card._id !== activeDraggingCardId
                );
                // cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
                nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
                    (card) => card._id
                );
            }
            // Column mới
            if (nextOverColumn) {
                // Kiểm tra xem card đang kéo nó có tồn tại ở overColumn chưa nếu có thì cần xóa nó trước
                nextOverColumn.cards = nextOverColumn.cards.filter(
                    (card) => card._id !== activeDraggingCardId
                );
                // cập nhật lại chuẩn dữ liệu columnId trong card sau khi kéo card giữa 2 column khác nhau
                const rebuild_activeDraggingCardData = {
                    ...activeDraggingCardData,
                    columnId: nextOverColumn._id,
                };
                // Tiếp theo là thêm card đang kéo vào overColumn theo vị trí index mới
                nextOverColumn.cards = nextOverColumn.cards.toSpliced(
                    newCardIndex,
                    0,
                    rebuild_activeDraggingCardData
                );
                // cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
                nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
                    (card) => card._id
                );
            }
            return nextColumns;
        });
    };
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
        // Nếu là kéo card thì mới thực hiện hành động set giá trị oldColumn
        if (event?.active?.data?.current?.columnId) {
            setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id));
        }
    };

    // Trong quá trình kéo thả
    const handleDragOver = (event) => {
        // KHÔNG LÀM GÌ THÊM NẾU ĐANG KÉO COLUMN
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            return;
        }

        // console.log("handleDragOver: ", event);
        // Còn nếu kéo card thì xử lý thêm để có thể kéo card qua lại giữa cá column
        const { active, over } = event;
        //Cần đảm bảo nếu không tồn tại active hoặc over (khi kéo ra khỏi phạm vi container) thì không làm gì cả
        if (!active || !over) {
            return;
        }
        // activeDraggingCard: là cáo card đang kéo
        const {
            id: activeDraggingCardId,
            data: { current: activeDraggingCardData },
        } = active;
        // ovarCard: là card mà activeDraggingCard kéo qua
        const { id: overCardId } = over;

        // Tìm 2 cái column chứa activeDraggingCard và overCard
        const activeColumn = findColumnByCardId(activeDraggingCardId);
        const overColumn = findColumnByCardId(overCardId);

        //Nếu không tồn tại 1 trong 2 column thì không làm gì hết
        if (!activeColumn || !overColumn) return;

        // Xử lý logic ở đây chỉ khi card qua 2 column khác nhau còn nếu kéo card trong chính column ban đầu của nó thì không làm gì
        if (activeColumn._id !== overColumn._id) {
            moveCardBetweenDifferentColumn(
                overColumn,
                overCardId,
                active,
                over,
                activeColumn,
                activeDraggingCardId,
                activeDraggingCardData
            );
        }
    };

    // Khi kết thúc kéo thả
    const handleDragEnd = (event) => {
        const { active, over } = event;

        //Cần đảm bảo nếu không tồn tại active hoặc over (khi kéo ra khỏi phạm vi container) thì không làm gì cả
        if (!active || !over) {
            return;
        }

        // console.log("handleDragEnd: ", event);
        // Xử lý kéo thả card
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
            // activeDraggingCard: là cáo card đang kéo
            const {
                id: activeDraggingCardId,
                data: { current: activeDraggingCardData },
            } = active;
            // ovarCard: là card mà activeDraggingCard kéo qua
            const { id: overCardId } = over;

            // Tìm 2 cái column chứa activeDraggingCard và overCard
            const activeColumn = findColumnByCardId(activeDraggingCardId);
            const overColumn = findColumnByCardId(overCardId);

            //Nếu không tồn tại 1 trong 2 column thì không làm gì hết
            if (!activeColumn || !overColumn) return;

            // Phải dùng tơi activerDragItemData.columnId hoặc oldColumnWhenDraggingCard._id( set vào state từ bước handleDragStart)
            //chứ không phải activeData trong scope handleDragEnd vì sau khi đi qua onDragOvẻ state của card đã bị cập nhật một lần
            if (oldColumnWhenDraggingCard._id !== overColumn._id) {
                moveCardBetweenDifferentColumn(
                    overColumn,
                    overCardId,
                    active,
                    over,
                    activeColumn,
                    activeDraggingCardId,
                    activeDraggingCardData
                );
            } else {
                //hành động kéo thả card trong cùng 1 column

                // Lấy vị trí cũ (từ oldColumnWhenDraggingCard)
                const oldCardIndex =
                    oldColumnWhenDraggingCard?.cards?.findIndex(
                        (c) => c._id === activeDragItemId
                    );
                // Lấy vị trí mới (từ overColumn)
                const newCardIndex = overColumn?.cards?.findIndex(
                    (c) => c._id === overCardId
                );
                //Dùng arayMove vì kéo card trong môt cái column thì tương tự với logic kéo column trong một cái boardContent
                const dndOrderedCards = arrayMove(
                    oldColumnWhenDraggingCard?.cards,
                    oldCardIndex,
                    newCardIndex
                );
                setOrderedColumns((prevColumns) => {
                    //Clone marng OrderedColumnsState cũ ra một cái mới để xử lý data rồi return - cập nhật lại OrderedColumnState mới
                    const nextColumns = cloneDeep(prevColumns);
                    //Tìm tới cái column mà đang thả
                    const targetColumn = nextColumns.find(
                        (column) => column._id === overColumn._id
                    );

                    // Cập nhật lại 2 giá trị mới là card và cardOrderIds trong targetColumn
                    targetColumn.cards = dndOrderedCards;
                    targetColumn.cardOrderIds = dndOrderedCards.map(
                        (card) => card._id
                    );
                    // Trả về giá trị state mới (chuẩn vị trí )
                    return nextColumns;
                });
            }
        }

        // Xử lý kéo thả column trong một boardContent
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            // Nếu vị trí sau khi kéo thả khác vị trí ban đầu
            if (active.id !== over.id) {
                // Lấy vị trí cũ (từ thằng active)
                const oldColumnIndex = orderedColumns.findIndex(
                    (c) => c._id === active.id
                );
                // Lấy vị trí mới (từ thằng over)
                const newColumnIndex = orderedColumns.findIndex(
                    (c) => c._id === over.id
                );

                //Dùng arrayMove để sắp xếp lại mảng bản đầu
                const dndOrderedColumns = arrayMove(
                    orderedColumns,
                    oldColumnIndex,
                    newColumnIndex
                );
                // Thứ tự id mới sau khi di chuyển
                // const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);

                // Cập nhật lại state sau khi kéo thả
                setOrderedColumns(dndOrderedColumns);
            }
        }

        // Những dữ liệu sau khi kéo thả luôn đưa về giá trị null mặc định ban đầu
        setActiveDragItemId(null);
        setActiveDragItemType(null);
        setActiveDragItemData(null);
        setOldColumnWhenDraggingCard(null);
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
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            // cảm biến
            sensors={sensors}
            //thuật toán phát hiện va chạm ( nếu ko có thì card với cover lớn sẽ ko kéo qua được column)
            //https://docs.dndkit.com/api-documentation/context-provider/collision-detection-algorithms
            collisionDetection={closestCorners}
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
