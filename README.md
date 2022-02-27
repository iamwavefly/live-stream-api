    React.useEffect(() => {
        if(successDelete){
            toast.success(messageDelete, { transition: bounce });  
        }
        if(errorDelete){
            toast.error(errorDelete, { transition: bounce });
        }
    }, [dispatch, successDelete, messageDelete, loadingDelete, errorDelete]);

            
    React.useEffect(() => {
        let data = workSpaceData;
        if(data){
            setName(data[0].name);
            setWorkspace_id(data[0].workspace_id);
        }
        if(errorGetWorkById){
            toast.error(errorGetWorkById, { transition: bounce });
        }
    }, [dispatch, successGetWorkById, messageGetWorkById, errorGetWorkById, workSpaceData]);
    

    React.useEffect(() => {
        if(editWorkspaceData && successEdit === true){
            toast.success(messageEdit, { transition: bounce });
            // setTimeout(() => {
            //     window.location.reload();
            // }, 4000);
        }
        if(errorEdit){
            toast.error(errorEdit, { transition: bounce });
        }
    }, [dispatch, editWorkspaceData, successEdit, messageEdit, loadingEdit, errorEdit]);











     const deleteWork = useSelector((state) => state.deleteWork);
  const { loading:loadingDelete, error:errorDelete, message:messageDelete, deleteWorkspaceData, success:successDelete } = deleteWork;

  const editWork = useSelector((state) => state.editWork);
  const { loading:loadingEdit, error:errorEdit, message:messageEdit, success:successEdit, editWorkspaceData } = editWork;

  const getWorkByIdAndUpd = useSelector((state) => state.getWorkByIdAndUpd);
  const { loading:loadinGetWorkById, error:errorGetWorkById, message:messageGetWorkById, success:successGetWorkById, workSpaceData  } = getWorkByIdAndUpd;








   onClick={async (e) => {
                                    dispatch(
                                      await editWorkspace(
                                        token,
                                        workspace_id,
                                        name,
                                        category,
                                      ))}}