export default function () {
  return [
    {
      title: "Main Panel",
      to: "/admin/",
      htmlBefore: '<i class="material-icons">edit</i>'
    },
    {
      title: "Orders",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/admin/orders"
    },
    {
      title: "Add Blog Post",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/admin/addpost"
    },
    {
      title: "Products",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/admin/manage-product"
    }
    // {
    //   title: "Content Strings",
    //   htmlBefore: '<i class="material-icons">table_chart</i>',
    //   to: "/admin/content-list"
    // }
  ];
}
