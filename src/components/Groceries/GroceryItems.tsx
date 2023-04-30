import React from "react";
import { GroceryItem } from "../../types";
import { Chip, FlexCol, FlexRow } from "..";
import { compareGroceryItems } from "../../helpers";

type Props = {
  groceryItems?: GroceryItem[];
  handleOnClick?: (item: GroceryItem) => void;
};

export const GroceryItems = ({ groceryItems, handleOnClick }: Props) => {

  const renderSelectedItems = () => {
    return groceryItems?.sort(compareGroceryItems).map((item) => (
      <Chip
        key={item._id}
        name={item.name}
        isSelected={item.isSelected}
        handleOnClick={() => handleOnClick && handleOnClick(item)}
      />
    ));
  };

  return (
    <FlexCol className="w-full">
      <FlexRow className="items-center content-center flex-wrap">
        {renderSelectedItems()}
      </FlexRow>
    </FlexCol>
  );
};
