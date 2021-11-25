export class DataCardProps {
  /** data name */
  title? = ''

  /** data description */
  description? = ''

  /** awesome icon's class */
  icon? = ''

  /** display spinner instead of data */
  loading? = false

  /** display error message instead of data */
  error? = false

  /** the actual value */
  data!: string
}
