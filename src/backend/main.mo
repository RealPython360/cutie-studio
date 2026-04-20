import Types "types/inquiry";
import InquiryMixin "mixins/inquiry-api";
import List "mo:core/List";

actor {
  let inquiries = List.empty<Types.Inquiry>();
  let counter = { var value : Nat = 0 };

  include InquiryMixin(inquiries, counter);
};
