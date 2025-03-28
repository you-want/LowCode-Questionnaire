// import { defineComponent, ref, inject } from "vue";
// import { Editor } from "@/control/Editor";
// import { Node } from "@/control/Node";
// import { Topics } from "@/control/Topics";
// import { Actions } from "@/types/editor.types";
// import { DragDrop } from "@/components/DragDrop";
// import Table from "../page-field/Table.vue";

// // <Render node={node} />

// // div | image | text | root

// function render(node: Node) {
//   switch (node.getType()) {
//     case "root":
//       return <Root node={node} />;
//     case "text":
//     case "rect":
//     case "image":
//     case "table":
//       return <ItemRenderForDraggable node={node} />;
//     default:
//       throw new Error(`unsupported node type:${node.getType()}`);
//   }
// }

// type RainComponent = {
//   node: Node;
// };

// function renderItem(node: Node) {
//   console.log(node.getType())
//   switch (node.getType()) {
//     case "image":
//       return (
//         <img
//           style={{
//             width: `${node.getW()}px`,
//             height: `${node.getH()}px`,
//           }}
//           src={
//             "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c6b8a945d9d443d8a48184e7d04749c~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp?"
//           }
//         />
//       );
//     case "rect":
//       return (
//         <div
//           style={{
//             width: `${node.getW()}px`,
//             height: `${node.getH()}px`,
//             backgroundColor: "red",
//           }}
//         />
//       );
//     case "text":
//       return (
//         <h2
//           style={{
//             width: `${node.getW()}px`,
//             height: `${node.getH()}px`,
//           }}
//         >
//           这里是文本
//         </h2>
//       );
//     case "table":
//       return <Table />;
//   }
// }

// const ItemRenderForDraggable = ({ node }: RainComponent) => {
//   const editor = inject("editor") as Editor;
//   return (
//     <DragDrop
//       initialPosition={[node.getX(), node.getY()]}
//       onDragstart={() => {
//         editor.dispatch(Actions.EvtDragStart, node);
//       }}
//       onDragend={(vec: any) => {
//         editor.dispatch(Actions.EvtDragEnd, vec);
//       }}
//     >
//       {renderItem(node)}
//     </DragDrop>
//   );
// };

// const Root = ({ node }: RainComponent) => {
//   const children = node.getChildren();
//   return (
//     <div data-rain="root">
//       {children.map((node, i) => {
//         return <Render key={i} node={node} />;
//       })}
//     </div>
//   );
// };

// export const Render = defineComponent({
//   components: {},
//   props: {
//     node: {
//       type: Node,
//       required: true,
//     },
//   },
//   setup({ node }) {
//     const ver = ref(0);
//     node
//       .on([Topics.NodeChildrenUpdated, Topics.NodePositionMoved])
//       .subscribe(() => {
//         ver.value++;
//       });

//     return () => {
//       return <Dummy key={ver.value} render={() => render(node)} />;
//     };
//   },
// });

// function Dummy({ render }: { render: ()=> JSX.Element }) {
//   return render();
// }

// // export const Render = ({node} : RainComponent) => {
// //   return render(node)
// // }
