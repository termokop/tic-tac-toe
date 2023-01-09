export function Square(props:any) {
    return (
      <button className='bg-yellow-200 h-20 w-20 m-1 text-7xl text-green-600' onClick={props.onClick}>
        {props.value}
      </button>
    );
}