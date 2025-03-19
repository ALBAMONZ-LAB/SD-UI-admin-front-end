import { EventDetailRequest } from "@sd-ui-admin/types";
import { useFormContext, useWatch } from "react-hook-form";


export function PreviewDetail(){
  const { control } = useFormContext<EventDetailRequest>();
  const eventTitle = useWatch({ control, name: 'eventTitle' });


  return (
    <>
      <pre>{eventTitle}</pre>
    </>
  )
}

export default PreviewDetail;