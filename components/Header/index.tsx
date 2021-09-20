import { FunctionComponent, useState, useCallback } from "react";

import {  Heading, Button, Popover, FormLayout, DatePicker, Range } from '@shopify/polaris';

import styles from './header.module.scss';

interface HeaderProps {
  siteName: string,
  selectedDates: Range,
  onDateChange: (date: Range) => void
}

/**
 * Header with the site name and a date picker
 */
const Header: FunctionComponent<HeaderProps> = ({ siteName, selectedDates, onDateChange }) => {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      Date Range
    </Button>
  );


  const today = new Date()

  const [{month, year}, setDate] = useState({month: today.getMonth(), year: today.getFullYear()});

  const handleMonthChange = useCallback(
    (month, year) => setDate({month, year}),
    [],
  );

  return (
    <div className={styles.headerContainer}>
      <div>
        <Heading element="h1">{ siteName }</Heading>
      </div>
      <div className={styles.datePicker}>
        <Popover
          active={popoverActive}
          activator={activator}
          onClose={togglePopoverActive}
          ariaHaspopup={false}
          sectioned
          preferredAlignment="right"
        >
          <FormLayout>
            <DatePicker
              month={month}
              year={year}
              onChange={onDateChange}
              onMonthChange={handleMonthChange}
              selected={selectedDates}
              disableDatesAfter={new Date()}
            />
          </FormLayout>
        </Popover>
      </div>
    </div>
  )
}

export default Header;