import { useSearchParams } from "react-router"

function useURLGeoLocation() {

  const [searchParams] = useSearchParams()
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
return [lat , lng]
}

export default useURLGeoLocation
