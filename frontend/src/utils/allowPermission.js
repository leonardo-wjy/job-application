const AllowPermission = (
  dataPermission,
  setDataPermission,
  pathName,
  parentName,
  history
) => {
  if (dataPermission.some((parent) => parent.name === parentName)) {
    let data = "";
    for (let i = 0; i < dataPermission.length; i++) {
      if (dataPermission[i].name === parentName) {
        data = dataPermission[i].child;
      }
    }
    if (data?.some((child) => child.url === pathName)) {
      let dataChild = "";
      for (let a = 0; a < data?.length; a++) {
        if (data[a].url === pathName) {
          dataChild = data[a].permission;
        }
      }
      setDataPermission(dataChild);
    } else {
      history.push("/dashboard");
    }
  } else {
    history.push("/dashboard");
  }
};

export default AllowPermission;
