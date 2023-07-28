import { ObjectInfo } from '@/config/commonInterface';
import { shortAddress } from '@/utils/shorterAddress';
import { ObjectType } from '@/config/commonInterface';

function BubbleChild({
    selectedObjId,
    data,
    setClick
}: {
    selectedObjId: string;
    data: ObjectInfo;
    setClick: (id: string) => void;
}) {
    const { _id, address, name, category } = data;
    const isChoosed = _id.$oid === selectedObjId;

    const getColor = (category: ObjectType) => {
        switch (category) {
            case ObjectType.Token:
                return 'bg-object-token';
            case ObjectType.Contract:
                return 'bg-object-contract';
            case ObjectType.EOA:
                return 'bg-object-eoa';
        }
    };

    return (
        <div
            className={`w-full h-full rounded-full ${
                isChoosed ? getColor(category) : 'bg-gray-500'
            } flex-center flex-col text-white text-base ${
                isChoosed ? 'z-50' : 'hover:scale-110 cursor-pointer'
            } transition-all duration-300`}
            onClick={() => {
                setClick(_id.$oid);
            }}
        >
            <span>{name}</span>
            <span>{shortAddress(address)}</span>
        </div>
    );
}

export default BubbleChild;
