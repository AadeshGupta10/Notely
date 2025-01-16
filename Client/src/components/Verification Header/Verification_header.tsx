interface props {
    name: string
}

const Verification_header = ({ name }: props) => {
    return (
        <>
            <img src="/notely_light.png"
                alt="notely"
                className='w-20' />
            <p className='text-4xl mt-1 ms-[-.14rem] mb-0 font-semibold text-black cursor-default'>
                {name}
            </p>
        </>
    )
}

export default Verification_header