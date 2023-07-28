function BasicInfo({ data }: { data: { name: string; address: string } }) {
    return (
        <div className="text-main-textGray py-3 font-normal text-sm px-1">
            <h2 className="text-xl font-medium">Monitoring Boards</h2>
            <div className="flex items-center">
                <div className="break-words w-full">
                    <p>
                        <span className="text-white bg-indigo-200 mr-4 px-1 rounded leading-5">
                            Ethereum
                        </span>
                        <span className="mr-4 whitespace-nowrap">
                            {data.name}
                        </span>
                        <span className="whitespace-nowrap">
                            {data.address}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default BasicInfo;
