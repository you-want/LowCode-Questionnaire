// import { defineComponent } from "vue";
// import { Actions } from "@/types/editor.types";
// import meta from "../meta";
// import { Editor } from "@/control/Editor";
// import classes from "../index.module.less";

// // type EditorProps = {
// //     editor: Editor
// // }

// // type Unwrapped<T> = T extends (infer U)[] ? U : T

// export default defineComponent({
//   props: {
//     editor: Editor,
//   },
//   setup({ editor }) {
//     return () => {
//       return (
//         <div class={classes["item-list"]}>
//           {meta.map(
//             (item: {
//               type: string | number | symbol | undefined;
//               title: any;
//             }) => {
//               return (
//                 <div
//                   draggable={true}
//                   onDragstart={(e) => {
//                     console.log("onDragStart");
//                     editor?.dispatch(Actions.StartAddComponent, item);
//                   }}
//                   onDrop={(e) => {
//                     e.preventDefault();
//                     console.log("drop");
//                     editor?.dispatch(Actions.EvtDrop);
//                   }}
//                   class={classes.item}
//                   key={item.type}
//                 >
//                   {item.title}
//                 </div>
//               );
//             }
//           )}
//         </div>
//       );
//     };
//   },
// });
