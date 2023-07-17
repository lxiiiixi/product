import { ObjectType } from '@/config/commonInterface';

function ObjectGroupHead({ objectType }: { objectType: ObjectType }) {
    return (
        <div className="flex items-center">
            <div
                className={`w-[9px] h-[18px] rounded-lg bg-object-${objectType.toLocaleLowerCase()} mr-2`}
            ></div>
            <h3 className="font-medium text-lg">{objectType}</h3>
        </div>
    );
}

export default ObjectGroupHead;
