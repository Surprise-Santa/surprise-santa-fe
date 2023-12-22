// // import { Flex, Text, Select } from '@chakra-ui/react';
// import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

// interface PropType {
//   totalCount: number;
//   handlePreviousLoad: () => void;
//   handleNextLoad: () => void;
//   nextLoad?: string;
//   previous?: string;
//   count: number;
//   setCount: React.Dispatch<React.SetStateAction<number>>;
//   selectedPageSize: number;
//   setSelectedPageSize: (size: number) => void;
// }

// const TablePagination = ({
//   totalCount,
//   handlePreviousLoad,
//   handleNextLoad,
//   previous,
//   nextLoad,
//   count,
//   setCount,
//   selectedPageSize,
//   setSelectedPageSize
// }: PropType) => {
//   const pageSizes = [10, 20, 30, 40, 50, 100];
//   return (
//     <Flex fontWeight="300" my="1rem" align="center" justify="end" gap="2rem">
//     <div fontWeight="300" my="1rem" align="center" justify="end" gap="2rem">
//       <Flex gap="1rem" align="center">
//         <Text color="typography.neutral" fontSize={'1.2rem'}>
//           Rows per page:{' '}
//         </Text>
//         <Select
//           w={'5rem'}
//           value={selectedPageSize}
//           onChange={(e: any) => {
//             setSelectedPageSize(Number(e.target.value));
//           }}
//         >
//           {pageSizes.map(size => (
//             <option key={size} value={size}>
//               {size}
//             </option>
//           ))}
//         </Select>
//       </Flex>
//       <Flex gap="1.5rem">
//         <Text color="typography.neutral" fontSize={'1.2rem'}>
//           {count === 0 ? count + 1 : count * selectedPageSize + 1} -{' '}
//           {count * selectedPageSize + selectedPageSize > totalCount
//             ? totalCount
//             : count * selectedPageSize + selectedPageSize}{' '}
//           of {totalCount}
//         </Text>
//         <Flex gap=".5rem">
//           <Flex
//             display="flex"
//             h="2rem"
//             w="2rem"
//             alignItems="center"
//             justifyContent="center"
//             border="50%"
//             outline="none"
//             cursor={count < 1 ? 'not-allowed' : 'pointer'}
//             onClick={() => {
//               if (count < 1 || !previous) return;
//               handlePreviousLoad();
//               setCount(_count => _count - 1);
//             }}
//           >
//             <IoChevronBack color={!previous ? '#9FA2B4' : '#6B7280'} />
//           </Flex>
//           <Flex
//             display="flex"
//             h="2rem"
//             w="2rem"
//             alignItems="center"
//             justifyContent="center"
//             border="50%"
//             outline="none"
//             cursor={
//               count * selectedPageSize > totalCount || !nextLoad
//                 ? 'not-allowed'
//                 : 'pointer'
//             }
//             onClick={() => {
//               if (count + selectedPageSize > totalCount || !nextLoad) return;
//               handleNextLoad();
//               setCount(_count => _count + 1);
//             }}
//           >
//             <IoChevronForward
//               style={{ pointerEvents: !nextLoad ? 'none' : 'auto' }}
//               color={!nextLoad ? '#9FA2B4' : '#6B7280'}
//             />
//           </Flex>
//         </Flex>
//       </Flex>
//     </Flex>
//   );
// };

// export default TablePagination;
